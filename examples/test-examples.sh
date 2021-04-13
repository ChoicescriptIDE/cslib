for dir in cslib/examples/*/;
do
    echo "Testing Example: $dir"
    rm choicescript/web/mygame/scenes/*
    cp -r cslib/scenes/. choicescript/web/mygame/scenes
    cp -r $dir. choicescript/web/mygame/scenes
    cd choicescript
    node randomtest.js num=1 showText=true
    cd ..
done