FROM python:alpine3.19

WORKDIR /Server

COPY MilesmartServer MilesmartServer
COPY ui ui
COPY requirements.txt .
COPY main.py .

RUN pip3 install -r requirements.txt

EXPOSE 5000

CMD [ "python3", "main.py" ]