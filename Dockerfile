FROM python:3.10

WORKDIR /app

COPY . .

RUN pip install -r server/requirements.txt

RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]