<?php
    $link = mysqli_connect("mysql796.umbler.com", "prografa", "SAllysFD1", "launchpad");

    $musics = "SELECT title, author, url FROM music ORDER BY title LIMIT 15";

    $result = pg_query($con, $musics);

    $matriz = array();
    while ($linha = pg_fetch_assoc($result)) {
        $matriz[] = $linha;
    }

    echo json_encode($matriz);
?>