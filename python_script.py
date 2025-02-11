import requests
import time

vid_url = 'https:/some url'

api_res = requests.put(f"https://interview.RANDO.com/api/transcription?url=${vid_url}")
# could be an array
# mathing for overlap, sort by start time
# concurrent writing operation - different file

# once all loops complete
# join files in order - add to one srt file

job_id = api_res.json()['jobId'];

finished = False
transcription=''

while not finished:
  status_res = requests.get(f"https://interview.afsas;fdolads;fs.com/api/transcription?jobId={job_id}")
  status_info = status_res.json()
  print(status_info['progress'])

  if status_info['progress'] == 100:
    finished = True
    transcription = status_info['transcription']
  time.sleep(10)    

file = open("raw_transcription.txt", "w")
file.write(transcription)


# "transcription": "\n[{\"text\":\"Back here LIVE at the waterfront village\",\"start..."
# [
#   {
#     "text": "Back here LIVE at the waterfront village",
#     "startTime": 0,
#     "endTime": 2.75
#   },
#   {
#     "text": "with my friend the zombie, Jonathan",
#     "startTime": 2.75,
#     "endTime": 5.21
#   },

# ideal format write to a new file
# 1
# 00:00:00,000 --> 00:00:02,750
# Back here LIVE at the waterfront village

# 2
# 00:00:02,750 --> 00:00:05,210
# with my friend the zombie, Jonathan
# hours:minutes:seconds,milliseconds

print(transcription)

import json

file = open("raw_transcription.txt", "r")
transcription = file.read()

array_data = json.loads(transcription)

srt_file = open('srt_file.txt','w')

# {'text': "...Alright! You're a great zombie.", 'startTime': 10.18, 'endTime': 12.9}
# ...Alright! You're a great zombie.

def convert_time(time):
  if time == 0:
    return ["0","0"] # todo
  time = str(time)
  
  time_array = time.split('.')

  # sec, millisec# 00:00:00,000 --> 00:00:02,750
  sec = time_array[0]
  if len(sec) < 2:
    sec = "0" + sec
  msec = time_array[1] * 10
  msec = msec[0:2]
  if len(msec) < 3:
    msec = "0" + msec
    
  return f"00:00:{sec},{msec}"



idx = 1
for item in array_data:
  srt_file.write(f"{idx}\n")
  start_time_formatted = convert_time(item["startTime"])
  end_time_formatted = convert_time(item["endTime"])
                                    
  # hours:minutes:seconds,milliseconds
  srt_file.write(f"{start_time_formatted} --> {end_time_formatted}\n")
  srt_file.write(item['text'] + "\n\n")
  
  idx += 1  

# ideal format write to a new file
# 1
# 00:00:00,000 --> 00:00:02,750
# Back here LIVE at the waterfront village

# 2
# 00:00:02,750 --> 00:00:05,210
# with my friend the zombie, Jonathan
