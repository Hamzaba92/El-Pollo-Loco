const level1 = new Level(

    [

        new Chicken(),
        new Chicken(),
        new Chicken(),
        new littleChickens(309),
        new littleChickens(400),
        new littleChickens(750),
        new Endboss()

    ],


    [
        new Cloud('img/5_background/layers/4_clouds/1.png', 300, 0),
        new Cloud('img/5_background/layers/4_clouds/2.png', 1750, 0)
    ],



    [
        new BackgroundObjects('img/5_background/layers/air.png', -979, 0),
        new BackgroundObjects('img/5_background/layers/3_third_layer/2.png', -979, 0),
        new BackgroundObjects('img/5_background/layers/2_second_layer/2.png', -979, 0),
        new BackgroundObjects('img/5_background/layers/1_first_layer/1.png', -979, 0),


        new BackgroundObjects('img/5_background/layers/air.png', 0, 0),
        new BackgroundObjects('img/5_background/layers/3_third_layer/1.png', 0, 0),
        new BackgroundObjects('img/5_background/layers/2_second_layer/1.png', 0, 0),
        new BackgroundObjects('img/5_background/layers/1_first_layer/2.png', 0, 0),


        new BackgroundObjects('img/5_background/layers/air.png', 979, 0),
        new BackgroundObjects('img/5_background/layers/3_third_layer/2.png', 979, 0),
        new BackgroundObjects('img/5_background/layers/2_second_layer/2.png', 979, 0),
        new BackgroundObjects('img/5_background/layers/1_first_layer/1.png', 979, 0),


        new BackgroundObjects('img/5_background/layers/air.png', 979 * 2, 0),
        new BackgroundObjects('img/5_background/layers/3_third_layer/1.png', 979 * 2, 0),
        new BackgroundObjects('img/5_background/layers/2_second_layer/1.png', 979 * 2, 0),
        new BackgroundObjects('img/5_background/layers/1_first_layer/2.png', 979 * 2, 0),

    ],













)