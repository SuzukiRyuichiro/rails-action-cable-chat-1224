import { Controller } from "@hotwired/stimulus";
import { createConsumer } from "@rails/actioncable";

// Connects to data-controller="chatroom-subscription"
export default class extends Controller {
  static values = {
    chatroomId: Number,
  };

  static targets = ["messages"];

  connect() {
    this.channel = createConsumer().subscriptions.create(
      {
        channel: "ChatroomChannel",
        id: this.chatroomIdValue,
      },
      {
        received: (data) => this.#insertMessageAndScrollDown(data),
      }
    );
  }

  disconnect() {
    console.log("Unsubscribing!!!");
    this.channel.unsubscribe();
  }

  #insertMessageAndScrollDown(data) {
    // insert the incoming html string at the end of the messages
    this.messagesTarget.insertAdjacentHTML("beforeend", data);
    // scroll to the bottom of the messages div
    this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight);
  }

  resetForm(event) {
    event.target.reset();
  }
}
