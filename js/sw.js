/* TEST:
self.addEventListener('fetch', event => {
    event.respondWith(
        new Response('Hello World')
    );
});
*/

//put into cache everything of this project
const cacheArray = [
    './',
    './index.html',
    './restaurant.html',
    './css/styles.css',
    './js/main.js',
    './js/restaurant_info.js',
    './js/dbhelper.js',
    './data/restaurants.json',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg'
];
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('restaurant-reviews-v1')
            .then(cache => {
                return cache.addAll(cacheArray);
            })
    );
})

//check whether the request is in the cache; if that's the case, load it. otherwise connect to network
// -> Offline First
self.addEventListener('fetch', event => {
   event.respondWith(
       caches.match(event.request).then(response => {
           return response || fetch(event.request);
       })
   );
});