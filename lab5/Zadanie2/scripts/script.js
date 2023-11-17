function changeImage() {
    let number_regex = /\d+/;

    let colorMap = new Map([
        ["1", "red"],
        ["2", "blue"],
        ["3", "green"]
    ]);

    let image = document.querySelector(".container > img");

    let current_src = image.getAttribute("src");
    let current_number = parseInt(current_src.match(number_regex)[0]);

    let new_number = (current_number + 1) % 3 + 1;

    let new_color = colorMap.get(new_number.toString());

    image.setAttribute("src", `img/img${new_number}.jpg`);
    image.style.borderColor = new_color;
}