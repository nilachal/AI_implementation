const API_KEY = "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"
const API_URL = "https://api.openai.com/v1/chat/completions"

window.addEventListener("DOMContentLoaded", (event) => {
    const promptInput = document.getElementById("promptInput");
    const generateBtn = document.getElementById("generate");
    const resultText = document.getElementById("resultText");    

    const generate = async () => {
        if(promptInput.value == "") {
            resultText.classList.add("alert")
            resultText.classList.add("alert-danger")
            resultText.innerText = "Please enter a text"
            return
        }
        generateBtn.disabled = true
        resultText.innerText = "Generating..."
        try {
            const result = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: "suggest next 3 possible best short and concise reply message as per the message - "+promptInput.value }]
                })
            })
            const data = await result.json()
            resultText.classList.remove("alert")
            resultText.classList.remove("alert-danger")
            resultText.innerText = data.choices[0].message.content
        } catch (error) {
            console.error(error)
            resultText.classList.add("alert")
            resultText.classList.add("alert-danger")
            resultText.innerText = `Error occured ${error}`
        } finally {
            generateBtn.disabled = false
            resultText.classList.remove("alert")
            resultText.classList.remove("alert-danger")
        }
    }

    promptInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            generate()
        }
    });

    generateBtn.addEventListener("click", generate);
})
