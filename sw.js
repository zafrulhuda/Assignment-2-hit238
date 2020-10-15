self.addEventListener('install', evet =>{
    console.log('sw is installed');
   
}) ;

self.addEventListener('activate', e=>{

    console.log('activate');

    
    e.waitUntil(
        caches.keys().then(cacheName=>{
return Promise.all(

    cacheName.map(cache=>{
if(cache !=cacheName){
console.log('clearing all old caches')
return caches.delete(cache);

}

    })
)

        })
    );
});



self.addEventListener('fetch', e =>{
    console.log('fecth all');
    e.respondWith(
fetch(e.request)
.then(res=>{

const resClone = res.clone();


caches
.open(cacheName)
.then(cache =>{

    cache.put(e.request, resClone);
});
return res;

}) .catch(err => caches.match(e.request).then(res =>res))
       
    );
});
