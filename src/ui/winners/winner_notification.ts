import { getCar } from "../../api/api";

export async function winnerNotification(id: number) {
  const notification = document.createElement("div");
  const car = await getCar(id);
  notification.classList.add("notification");
  notification.innerHTML = `<p><span>${car.name}</span> (id: ${id}) won the race</p>`;
  document
    .getElementById("body")!
    .insertBefore(notification, document.querySelector(".container"));
  setTimeout(
    () => {
      const x = document.querySelector('.notification')!;
      x.parentNode!.removeChild(x);
    }, 3000
  );  
}
