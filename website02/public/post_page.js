document.addEventListener('DOMContentLoaded', function() {
    const textbox = document.querySelector('.post-textbox');
    const counter = document.querySelector('.char-counter');
    const postButton = document.querySelector('.post-button');
    const maxLength = 280;

    function updateCounter() {
        const remaining = maxLength - textbox.value.length;
        counter.textContent = remaining;
        
        // Update counter color based on remaining characters
        counter.classList.remove('warning', 'error');
        if (remaining <= 20) {
            counter.classList.add('error');
        } else if (remaining <= 40) {
            counter.classList.add('warning');
        }
    }

    async function handlePost() {
        const postContent = textbox.value.trim();
        
        if (!postContent) {
            alert('Please enter some text before posting.');
            return;
        }

        // Disable the button while posting
        postButton.disabled = true;
        postButton.style.opacity = '0.7';
        postButton.textContent = 'Posting...';

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: postContent,
                    timestamp: new Date().toISOString()
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            // Clear the textbox after successful post
            textbox.value = '';
            updateCounter();
            alert('Post created successfully!');

        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post. Please try again.');
        } finally {
            // Re-enable the button
            postButton.disabled = false;
            postButton.style.opacity = '1';
            postButton.textContent = 'Post';
        }
    }

    // Add event listeners
    textbox.addEventListener('input', updateCounter);
    postButton.addEventListener('click', handlePost);
    updateCounter(); // Initial count
}); 