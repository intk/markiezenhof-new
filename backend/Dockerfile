# syntax=docker/dockerfile:1
ARG PLONE_VERSION=6.0.2
FROM plone/plone-backend:${PLONE_VERSION}

LABEL maintainer="INTK <info@itsnotthatkind.org>" \
    org.label-schema.name="haagshistorischmuseum-backend" \
    org.label-schema.description="haagshistorischmuseum backend image." \
    org.label-schema.vendor="INTK"

# Add local code
COPY . .

# Install local requirements and fix permissions
RUN <<EOT
    ./bin/pip install mxdev
    mv requirements-docker.txt requirements.txt
    ./bin/mxdev -c mx.ini
    ./bin/pip install -r requirements-mxdev.txt
    chown -R plone: /app
EOT
