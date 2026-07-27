async function getBarcode(barcode: number) {
    const url = `https://barcodeapi.org/api/auto/${barcode}`

    const result = await fetch(url, { cache: "no-store" })
    .then(response => {
    var tokens = response.headers.get('X-RateLimit-Tokens');
    console.log("Tokens remaining: " + tokens);

    response.blob().then(blob => {
      var img = document.createElement("img");
      img.src = URL.createObjectURL(blob);
      document.body.appendChild(img);
    });
  });

return result;
};