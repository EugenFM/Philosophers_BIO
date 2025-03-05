const deleteText = document.querySelectorAll(".fa-trash");
const thumbsUpText = document.querySelectorAll(".fa-thumbs-up");

Array.from(deleteText).forEach((element) => {
  element.addEventListener("click", deletePhilosopher);
});

Array.from(thumbsUpText).forEach((element) => {
  element.addEventListener("click", addLike);
});

async function deletePhilosopher() {
  const philosopherName = this.parentNode.childNodes[1].innerText;
  const birthPlace = this.parentNode.childNodes[3].innerText;

  try {
    const response = await fetch("deletePhilosopher", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        philosopherNameS: philosopherName,
        birthPlaceS: birthPlace,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function addLike() {
  const philosopherName = this.parentNode.childNodes[1].innerText;
  const birthPlace = this.parentNode.childNodes[3].innerText;
  const tLikes = Number(this.parentNode.childNodes[5].innerText);

  try {
    const response = await fetch("addOneLike", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        philosopherNameS: philosopherName,
        birthPlaceS: birthPlace,
        likesS: tLikes,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
