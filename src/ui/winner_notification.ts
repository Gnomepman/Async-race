export function winnerNotification(id: number) {
  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.innerHTML = `<p>Car № <span>${id}</span> won the race</p>`;
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
