const baseCurrency = document.getElementById('baseCurrency');
const targetCurrency = document.getElementById('targetCurrency');
const amount = document.getElementById('amount');
const convertBtn = document.getElementById('convertBtn');
const result = document.getElementById('result');

const clrNonNumChar = () => {
    const regex = /[^0-9.]|\.(?=.*\.)/g;
    const amountVal = amount.value;
    const replaceChars = amountVal.replace(regex,'');
    amount.value = replaceChars;
}


const displayFetch = (str) => {
    let isLoading = true;
    if (isLoading) {
        result.textContent = 'Loading... wait a min!';
    }
    fetch(str, {
        headers: { 'X-Api-Key': 'bomU2X2kG8ZY4orlv/I0bg==AXHCq1zgAyRaHBNI' },
        method: 'GET',
    })
        .then(res => {
            if (!res.ok) throw new Error(res.status);
            return res.json();
        })
        .then(data => {
            const { new_amount } = data;
            isLoading = false;
            result.textContent = `${new_amount}`;
        })
        .catch(err => {
            isLoading = false;
            if (err.message.includes('net::Err')) {
                result.textContent = 'Network error occurred: Poor network. Please try again.';
            } else {
                result.textContent = `Data failed to load due to error: ${err}`;
            }
        });
}

const convertCurrency = () => {
    const fromVal = baseCurrency.value;
    const toVal = targetCurrency.value;
    const val = amount.value;

    if (!val) {
        alert('Please Enter a value to convert');
    } else {
        const url = `https://api.api-ninjas.com/v1/convertcurrency?want=${toVal}&have=${fromVal}&amount=${val}`;

        displayFetch(url);
    }
}

amount.addEventListener('input', clrNonNumChar);
convertBtn.addEventListener('click', convertCurrency);
