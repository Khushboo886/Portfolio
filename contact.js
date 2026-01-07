// AJAX contact form submit for Netlify
(function(){
    const form = document.getElementById('contact-form');
    const msg = document.getElementById('form-message');

    if(!form) return;

    function encode(data) {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            .join('&');
    }

    form.addEventListener('submit', function(e){
        // If JS disabled or form has no action, let default behavior proceed
        e.preventDefault();

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => data[key] = value);

        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode(data)
        }).then(function(response){
            if(response.ok) {
                // show inline thank you
                if(msg){
                    msg.style.display = 'block';
                    msg.innerHTML = '<strong>Thank you!</strong> Your message has been sent.';
                    form.style.display = 'none';
                } else {
                    window.location.href = '/thank-you.html';
                }
            } else {
                return response.text().then(function(text){ throw new Error(text || 'Form submission failed'); });
            }
        }).catch(function(err){
            if(msg){
                msg.style.display = 'block';
                msg.innerHTML = '<strong>Oops.</strong> There was a problem submitting the form. Please try again later.';
            } else {
                alert('Form submission failed');
            }
            console.error('Form submit error', err);
        });
    });
})();
