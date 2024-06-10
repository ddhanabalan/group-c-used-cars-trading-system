FROM python:alpine3.19

WORKDIR /

COPY MilesmartServer MilesmartServer
COPY ui ui
COPY requirements.txt .
COPY client_secret.json client_secret.json
COPY main.py .

RUN pip3 install -r requirements.txt

EXPOSE 5000

CMD [ "gunicorn", "-w", "8", "main:milesmartServer", "-b", "0.0.0.0:5000", "-t", "0"]