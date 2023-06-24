self.addEventListener('install', function(event) {
    console.log('Installed app.js', event);
});

self.addEventListener('activate', function(event) {
    console.log('Activated app.js', event);
});