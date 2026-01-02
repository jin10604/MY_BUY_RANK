const wrap=document.getElementById('frameWrap');
const modal=document.getElementById('modal');
const addBtn=document.getElementById('addBtn');
const saveBtn=document.getElementById('saveBtn');
const cancelBtn=document.getElementById('cancelBtn');

addBtn.onclick=()=>modal.classList.remove('hidden');
cancelBtn.onclick=()=>modal.classList.add('hidden');

saveBtn.onclick=()=>{
  const title=titleInput.value;
  const memo=memoInput.value;
  const price=priceInput.value;
  const img=imgInput.files[0];

  const card=document.createElement('div');
  card.className='card';

  if(img){
    const image=document.createElement('img');
    image.src=URL.createObjectURL(img);
    card.appendChild(image);
  }

  card.innerHTML+=`<h3>${title}</h3><p>${memo}</p><p>${price}</p>`;
  wrap.appendChild(card);

  modal.classList.add('hidden');
  updateScale();
};

wrap.parentElement.addEventListener('scroll',updateScale);

function updateScale(){
  const center=window.innerWidth/2;
  document.querySelectorAll('.card').forEach(card=>{
    const rect=card.getBoundingClientRect();
    const cardCenter=rect.left+rect.width/2;
    const dist=Math.abs(center-cardCenter);
    const scale=Math.max(.7,1-dist/400);
    card.style.transform=`scale(${scale})`;
  });
}
