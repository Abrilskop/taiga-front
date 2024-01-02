# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
#
# Copyright (c) 2021-present Kaleidos Ventures SL

# Herencia de contruccion de img a partir de la img base nginx
FROM nginx:1.23-alpine

# agregar el metadato para el soporte 
LABEL maintainer="support@taiga.io"

# copiar
COPY docker/default.conf /etc/nginx/conf.d/default.conf
COPY docker/conf.json.template /
COPY docker/config_env_subst.sh /docker-entrypoint.d/30_config_env_subst.sh

# Ejecucion de comandos

# - 'set -e' detiene la ejecución si algún comando devuelve un código de salida no exitoso.
# - 'set -u' produce un error si se intenta usar una variable no definida.
# - 'set -x' habilita la salida detallada de comandos para propósitos de depuración.
RUN set -eux; \
    apk update; \
    apk add --no-cache --virtual .build-deps \
       subversion; \
    apk add \
       bash; \
    # Install taiga-front core
    wget https://github.com/Abrilskop/taiga-front -O source.zip -O source.zip; \
    unzip source.zip; \
    mv /taiga-front-dist-6.7.1 /taiga; \
    ####
    mv /conf.json.template taiga/dist/; \
    chmod +x /docker-entrypoint.d/30_config_env_subst.sh; \
    # Install taiga-front contribs
    mkdir /taiga/dist/plugins; \
    cd /taiga/dist/plugins; \
    svn export "https://github.com/kaleidos-ventures/taiga-contrib-slack/tags/6.7.0/front/dist" "slack"; \
    svn export "https://github.com/kaleidos-ventures/taiga-contrib-github-auth/tags/6.7.0/front/dist" "github-auth"; \
    svn export "https://github.com/kaleidos-ventures/taiga-contrib-gitlab-auth/tags/6.7.1/front/dist" "gitlab-auth"; \
    cd /; \
    # Remove unused dependencies
    apk del --no-cache .build-deps; \
    rm source.zip; \
    # Ready for nginx
    mv /taiga/dist/* /usr/share/nginx/html; \
    rm -rf /taiga
