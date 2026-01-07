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
        e.preventDefault();

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => data[key] = value);

        // Ensure the Netlify form name is included
        if(!data['form-name']){
            const hidden = form.querySelector('input[name="form-name"]');
            data['form-name'] = hidden ? hidden.value : (form.getAttribute('name') || 'contact');
        }

        // Determine post URL: Netlify expects a POST to '/' for form processing.
        // If the form's action is a static HTML (like /thank-you.html), post to '/'.
        const action = (form.getAttribute('action') || '').trim();
        const postUrl = (action && !action.endsWith('.html')) ? action : '/';

        fetch(postUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'text/html'
            },
            body: encode(data)
        }).then(function(response){
            // Read server response text for display/debugging
            return response.text().then(function(text){
                if(response.ok){
                    if(msg){
                        msg.style.display = 'block';
                        // show server response if it contains useful text, otherwise fallback
                        msg.innerHTML = text && text.trim().length > 0
                            ? text
                            : '<strong>Thank you!</strong> Your message has been sent.';
                        form.style.display = 'none';
                    } else {
                        window.location.href = '/thank-you.html';
                    }
                } else {
                    // show server-provided error text when available
                    const errText = text || 'Form submission failed';
                    throw new Error(errText);
                }
            });
        }).catch(function(err){
            if(msg){
                msg.style.display = 'block';
                // prefer server message when provided (err.message may contain it)
                msg.innerHTML = '<strong>Oops.</strong> ' + (err && err.message ? err.message : 'There was a problem submitting the form. Please try again later.');
            } else {
                alert('Form submission failed: ' + (err && err.message ? err.message : 'Unknown error'));
            }
            console.error('Form submit error', err);
        });
    });
})();
