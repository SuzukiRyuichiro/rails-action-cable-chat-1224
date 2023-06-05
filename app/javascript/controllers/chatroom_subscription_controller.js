import { Controller } from "@hotwired/stimulus";
import { createConsumer } from "@rails/actioncable";

// Connects to data-controller="chatroom-subscription"
export default class extends Controller {
  static values = {
    chatroomId: Number,
  };

  static targets = ["messages"];

  connect() {
    createConsumer().subscriptions.create(
      {
        channel: "ChatroomChannel",
        id: this.chatroomIdValue,
      },
      {
        received: (data) => {
          // insert the incoming html string at the end of the messages
          this.messagesTarget.insertAdjacentHTML("beforeend", data);
        },
      }
    );
  }
}
