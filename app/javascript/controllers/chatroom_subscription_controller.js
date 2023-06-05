import { Controller } from "@hotwired/stimulus";
import { createConsumer } from "@rails/actioncable";

// Connects to data-controller="chatroom-subscription"
export default class extends Controller {
  static values = {
    chatroomId: Number,
  };

  connect() {
    createConsumer().subscriptions.create({
      channel: "ChatroomChannel",
      id: this.chatroomIdValue,
    });
  }
}
