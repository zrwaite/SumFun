FROM python:3.8-slim-buster

WORKDIR /app

COPY server/requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

COPY ./server .

EXPOSE 8006

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]