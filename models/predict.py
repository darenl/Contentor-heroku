import tweepy as tp
import re
from unidecode import unidecode

consumer_key = "Qni3V9KJP1HTwNLsiJGMjousn"
consumer_secret = "7s065I0sueu3z48vKmlQwC2gueVib5EoWx3tUHGbU8r3qJmzpC"
access_token = "3785833888-azkc4AWc1jSrTthqBj2T9CSYlvd7RzzLkYRHTHP"
access_secret = "cEYlHtZqeHLdnU6W69g5nka7qH16QaefVUjc6fzqQnJKL"

auth = tp.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_secret)
api = tp.API(auth, wait_on_rate_limit=True)

def generate(keywords):
    tweet_count = 0
    tweets = []
    for status in tp.Cursor(api.search, q=keywords, lang='en', id='16929349').items():
        if tweet_count > 9:
            print("Completed Tweet Retrieval")
            break
        if status.text.startswith("@") == False and status.text.startswith("RT") == False:
            tweet = re.sub(r'https.*', '', status.text).replace("\n", " ").strip()
            tweet_count += 1
            tweets.append(unidecode(tweet))
    print(tweets)
    return tweets
    # keywords = keywords.split(",")
    # return decode_sequence(keywords)