#!/bin/bash

########################################################################
#	- This is the main script that is used to compile/interpret the source code
#	- The script takes 3 arguments
#		1. The compiler that is to compile the source file.
#		2. The source file that is to be compiled/interpreted
#		3. Additional argument only needed for compilers, to execute the object code
#	
#	- Sample execution command:   $: ./script.sh g++ file.cpp ./a.out
#	
########################################################################

compiler=$1
file=$2
output=$3
addtionalArg=$4

########################################################################
#	- The script works as follows
#	- It first stores the stdout and std err to another stream
#	- The output of the stream is then sent to respective files
#	
#	
#	- if third arguemtn is empty Branch 1 is followed. An interpretor was called
#	- else Branch2 is followed, a compiler was invoked
#	- In Branch2. We first check if the compile operation was a success (code returned 0)
#	
#	- If the return code from compile is 0 follow Branch2a and call the output command
#	- Else follow Branch2b and output error Message
#	
#	- Stderr and Stdout are restored
#	- Once the logfile is completely written, it is renamed to "completed"
#	- The purpose of creating the "completed" file is because NodeJs searches for this file 
#	- Upon finding this file, the NodeJS Api returns its content to the browser and deletes the folder
#
#	
########################################################################

exec  1> $"/usercode/stdout.txt"
exec  2> $"/usercode/errors"
#3>&1 4>&2 >

#read first line of config, remove trailing return character
type=$(sed -n 1p /usercode/config | tr -d '\r')
testStart=1
#read second line of config, remove trailing return character
testEnd=$(sed -n 2p /usercode/config | tr -d '\r')


START=$(date +%s.%2N)
#Maybe loop in an array or something later...
if [ $type -eq 10 ] || [ $type -eq 11 ] || [ $type -eq 12 ] || [ $type -eq 13 ]; then	
    #type 10 read from stdin and write to stdout
	#type 11 reads from input.txt writes to output.txt
	#type 12 reads from sdtin writes to output.txt
	#type 13 reads from input.txt and writes to stdout

	#Branch 1
	if [ "$output" = "" ]; then
		$compiler /usercode/$file -< $"/usercode/inputFile" #| tee /usercode/output.txt
	#Branch 2
	else
		#In case of compile errors, redirect them to a file
			$compiler /usercode/$file $addtionalArg #&> /usercode/errors.txt
		#Branch 2a
		if [ $? -eq 0 ];	then
			#User's code write to local dir, docker logs into root dir
			#by changing directory ensures the expected output.txt is written
			#to the /usercode folder			
			cd "/usercode"
			
			for ((i=testStart; i<=$testEnd; i++))
			do 
				echo "test$i.in"
				
				if [ $type -eq 11 ] || [ $type -eq 13 ]; then 
					cp -f "/usercode/test$i.in" "/usercode/input.txt"
				fi
				
				#user code expected to create an output.txt file
				if [ $type -eq 10 ]; then	
					$output -< $"/usercode/test$i.in" | tee "/usercode/output.txt"
				elif [ $type -eq 11 ]; then 
					$output
				elif [ $type -eq 12 ]; then 
					$output -< $"/usercode/test$i.in"
				elif [ $type -eq 13 ]; then
					#change output.txt to something obsure, so user can't guess
					#what it is...worst case, by writing to output.txt in this case
					#they will messup their own output....
					$output | tee "/usercode/output.txt"
				fi
				
				if diff -Z "/usercode/output.txt" "/usercode/test$i.out" > /dev/null
				 then
					echo "*-COMPILEBOX::DECISION-*,Accepted,test$i" >> "/usercode/logfile.txt"
				 else
					echo "*-COMPILEBOX::DECISION-*,Wrong Answer,test$i" >> "/usercode/logfile.txt"
					break
				fi

			done    
		#Branch 2b
		else
			echo "Compilation Failed" >> "usercode/logfile.txt"
			#if compilation fails, display the output file	
			#cat /usercode/errors.txt
		fi
	fi	
else 
  echo "type $type Working on judge, check back later :-)" >> "/usercode/logfile.txt"
fi
#exec 1>&3 2>&4

#head -100 /usercode/logfile.txt
#touch /usercode/completed
END=$(date +%s.%2N)
runtime=$(echo "$END - $START" | bc)


echo "*-COMPILEBOX::ENDOFOUTPUT-*" $runtime >> "/usercode/logfile.txt"
echo "*-COMPILEBOX::ENDOFOUTPUT-*" $runtime 


mv /usercode/logfile.txt /usercode/completed

