# Apache Kafka + Websockets to Stream Data

Project on implementing streaming of data with Kafka and Websockets in Node JS

## YouTube

[![Stream data with Kafka and Websockets | Node Js](https://ytcards.demolab.com/?id=LW-c_WGVhkk&title=Stream+data+with+Kafka+and+Websockets+%7C+Node+Js&lang=en&timestamp=1709490624&background_color=%230d1117&title_color=%23ffffff&stats_color=%23dedede&max_title_lines=1&width=250&border_radius=5 "Stream data with Kafka and Websockets | Node Js")](https://www.youtube.com/watch?v=LW-c_WGVhkk)

## Set up the demo

1. Install requirements: (`node, npm, docker-compose`)

2. Install all node projects. From a terminal in the project root folder:

    ```bash
   cd ./backend && npm i
   cd ../frontend && npm i
    ```

3. Edit `./docker-compose.yml`:20
   - substitute local host IPv4 address

4. Start up the **Kafka** container

    ```bash
    cd .. && docker-compose up
    ```

5. In a **new** terminal, start up the **backend**

    ```bash
    # Backend server
    cd ./backend && npm run dev
    ```

6. In a **new** terminal, start up the **frontend**

    ```bash
    # Front end app
    cd ./frontend && npm run dev
    ```

7. Open a **browser** on http://127.0.0.1:3000/

8. In a **new** terminal, start up the **producer**

    ```bash
    # Kafka producer app
    cd ./backend && node src/producer.js
    ```

9. Arrange your windows so that browser and producer terminal are both visible.

10. In the **producer** window, enter data points. Each line contains three space-separated values, followed by a newline. The three values are:

    - `[x-value (alpha)] [y-value (number)] [partition id [0,1]]`

    - For example:

    ```text
    a 50 0
    a 50 1
    b 45 0
    b 45 1
    c 55 0
    c 55 1
    ```

11. To close down the Kafka container, open a terminal on the root folder of the project:

    ```bash
    docker-compose down
    ```
