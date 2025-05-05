@echo off
if not exist public\images (
    mkdir public\images
)
copy image\burger.jpeg public\images\
copy image\coke.jpeg public\images\
copy image\fries.jpeg public\images\
