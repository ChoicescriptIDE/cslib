test_count=0
pass_count=0
for dir in cslib/examples/*/;
do
    test_count=$((test_count + 1))
    echo "Testing Example: $dir"
    rm choicescript/web/mygame/scenes/*
    cp -r cslib/scenes/. choicescript/web/mygame/scenes
    cp -r $dir. choicescript/web/mygame/scenes
    cd choicescript
    node randomtest.js num=1 showText=true
    if [ "$?" -eq "0" ]; then
        pass_count=$((pass_count + 1))
    else
        echo "FAILURE: $dir";
    fi
    cd ..
done
if [ "$test_count" -eq "$pass_count" ]; then
    echo "ALL TESTS PASSED.";
    exit 0;
else
    echo "$((test_count - pass_count)) TEST(S) FAILED."
    exit -1;
fi