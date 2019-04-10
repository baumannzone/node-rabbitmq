#!/usr/bin/env python
import pika
import sys
credentials = pika.credentials.PlainCredentials('a360b', 'password')
 
connection = pika.BlockingConnection(pika.ConnectionParameters(host='10.32.4.7', port='5672', credentials=credentials, virtual_host='asd'))
channel = connection.channel()
 
channel.queue_declare(queue='task_queue', durable=True)
 
message =  "Hello World!"
 
channel.basic_publish(exchange='',
                    routing_key='task_queue',
                    body=message,
                    properties=pika.BasicProperties(
                        delivery_mode = 2, # make message persistent
                    ))
print("Sent message %s n: %i" % (message, 0))
connection.close()