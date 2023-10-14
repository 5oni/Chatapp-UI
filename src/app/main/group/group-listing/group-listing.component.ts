import { Component } from '@angular/core';
import { GroupService } from '../services/group.service';
import { Router } from '@angular/router';
import { CommonApiService } from 'src/app/services/common-api.service';
import { interval } from 'rxjs';
import { ElementRef, ViewChild, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-group-listing',
  templateUrl: './group-listing.component.html',
  styleUrls: ['./group-listing.component.scss']
})
export class GroupListingComponent {

  @ViewChild('messagesContainer') private messagesContainer: ElementRef;
  @ViewChild('reactionDiv') private reactionDiv: ElementRef;

  emojiMartConfig = {
    include: ["people"],
    style: {
      "background-color": '#fcfcfc',
      height: '100px', width: '300px',
      overflow: 'scroll',
    }
  }
  groupList: any
  selectedGroup: any;
  chatMessages: any[] = []
  newMessage: string = '';
  currentUserId: any
  intervalId: any;
  showReactions: any = false
  positionStyles: any
  prevSelectedGroup: any

  dialogPosition: any
  selectedChat: any
  selectedChatIndex: any

  constructor(
    private groupService: GroupService,
    private router: Router,
    private sharedService: CommonApiService,
  ) { }



  ngOnInit() {
    this.getCurrentUser()
    this.getUserGroups()
    this.intervalId = setInterval(() => {
      this.getSelectedGroupChat() //TODO
    }, 1000)
  }



  scrollToBottom(): void {
    try {

      console.log(this.messagesContainer.nativeElement.scrollHeight)
      setTimeout(() => {

        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight
      }, 100)
    } catch (err) { }
  }
  getCurrentUser() {
    this.currentUserId = this.sharedService.getCurrentUserId();
  }

  showDate(i: any) {
    if (i == 0) {
      return true
    }
    let msgDate = new Date(this.chatMessages[i]?.createdAt)
    let prevMsgDate = new Date(this.chatMessages[i - 1]?.createdAt)
    if (prevMsgDate.getDate() == msgDate.getDate() && prevMsgDate.getMonth() == msgDate.getMonth() && prevMsgDate.getFullYear() == msgDate.getFullYear()) {
      return false
    }
    return true
  }

  showReactionsPopup(chat: any, event: any, pos: any, index: any) {
    this.selectedChat = chat
    this.selectedChatIndex = index

    let add = 50
    if (pos < 0) {
      add = -350
    }
    // Calculate the position based on the click event
    const x = event.clientX + add + 'px';
    const y = event.clientY + 'px';

    // Set the position of the div
    this.positionStyles = { left: x, top: y, height: '100px' };
    console.log(this.positionStyles)
    this.showReactions = true;
    this.reactionDiv.nativeElement.focus()
    this.messagesContainer.nativeElement.style.overflow = 'hidden'


  }

  sendMessage() {
    if (!this.newMessage) {
      return
    }
    let payload = {
      message: this.newMessage,
      groupId: this.selectedGroup._id
    }
    this.groupService.sendNewGroupChat(payload).subscribe({
      next: (resp: any) => {
        this.newMessage = ''
        this.getSelectedGroupChat()

      },
      error: (e) => {
        console.error(e);
      }
    })
  }



  openGroupChat(group: any) {
    this.selectedGroup = group;
    this.getSelectedGroupChat()
  }

  getSelectedGroupChat() {
    if (!this.selectedGroup) {
      return
    }
    let payload = {
      groupId: this.selectedGroup?._id
    }
    this.groupService.getGroupChatList({ params: payload }).subscribe({
      next: (resp: any) => {
        console.log(resp);
        let prevLength = this.chatMessages?.length || 0
        if (resp.data?.length != prevLength || this.prevSelectedGroup != this.selectedGroup) {
          this.chatMessages = resp.data
          this.scrollToBottom();
        }
        this.prevSelectedGroup = this.selectedGroup
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

  getUserGroups() {
    this.groupService.getGroupsList().subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.groupList = resp.data
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

  handleAddGroupButton() {
    this.router.navigate(['/add'])
  }

  addReaction(emoji: any) {
    if (!this.selectedChat || !emoji) {
      return
    }
    let payload = {
      emoji: emoji?.emoji?.native,
      chatId: this.selectedChat._id,
      groupId: this.selectedGroup._id
    }

    this.groupService.addChatReaction(payload).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.onblurDiv()
        this.chatMessages[this.selectedChatIndex].reactions.push({
          emoji: emoji?.emoji?.native,
          userId: { _id: this.currentUserId }

        })
      },
      error: (e) => {
        console.error(e);
      }
    })

  }

  onblurDiv() {
    console.log("blur")
    this.showReactions = false;
    this.messagesContainer.nativeElement.style.overflow = 'scroll'
  }
  removeEmojiReaction(reaction: any, index: any) {
    console.log(reaction)
    if (!reaction || reaction.userId?._id != this.currentUserId) {
      return
    }
    let payload = {
      emoji: reaction?.emoji,
      chatId: this.chatMessages[index]?._id,
      groupId: this.selectedGroup._id
    }

    this.groupService.removeChatReaction(payload).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.chatMessages[index].reactions = this.chatMessages[index]?.reactions.filter((el: any) => el._id !== reaction._id)
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

  ngOnDestroy() {
    clearInterval(this.intervalId)
  }
}
