# najnowsza wersja serwera Node.js zanistalowana na dystrybucji Linxa Alpine
FROM node:current-alpine

# ustawienie domyślnego numeru portu, na którym będzie dostępna uruchomiona aplikacja napisana w Express.js
ARG DEFALT_PORT=3000

# instacjacja globalnych (opcja -g) pakietów dla Node.js,
# które będą służyć jako narzędzia do pracy; wszystko jest realizowane z poziomu użytkownika root (administratora)
RUN npm install -g nodemon

RUN npm install -g express-generator

RUN npm install -g yo

RUN npm install -g generator-express-es6

RUN npm install -g -D typescript

# Dodanie grupy node2 dla użytkownika node2
RUN addgroup -g 1001 node2

# Dodanie użytkownika node2 w grupie node2 z pustych hasłem
# i takim samym katalogiem domowym jak użytkownik node
RUN adduser -h /home/node -s /bin/sh -u 1001 -G node2 -D node2

ENV PORT=$DEFALT_PORT

# Określa, który użytkownik ma być odpowiedzialny za uruchamianie poleceń RUN, ENTRYPOINT i CMD
# Tutaj określamy, że interaktywny tryb pracy ma być uruchamiany dla użytkownika
# "node" (dla loginu grupa1) albo node2 (dla loginu grupa2)
# USER node
# USER node2

# ustawienie katalogu roboczego dla poleceń RUN, CMD, ...
# tuataj ustawienie domyślnego katalogu pracy na katalog domowy użytownika "node" czyli /home/node
WORKDIR /home/node

# informacja dla użytkowników naszego obrazu, na jakim porcie nasłuchuje aplikacja uruchomiona w tym kontenerze
# jest to dokumentacja działania naszego obrazu, a nie polecenie mające wpływ na jego działanie
EXPOSE $PORT

# domyślne polecenie uruchamiane przy starcie kontenera,
# tutaj mamy narzędzie shell, które pozwala na używanie zainstalowanych narzędzi
# i uruchamianie tworzonej aplikacji
CMD [ "sh" ]
