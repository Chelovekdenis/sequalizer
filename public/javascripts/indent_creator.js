let data = $("#des")
let a = data.text().split('\n')

// Обнуляем предыдущие данные, чтобы не было повтора
data.text("")

for (let i = 0; i < a.length; i++) {
    data.append('<p>' + a[i] + '</p>');
}
