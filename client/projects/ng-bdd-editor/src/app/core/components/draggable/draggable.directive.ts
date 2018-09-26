import {Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

let source: HTMLElement;
let target: HTMLElement;

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements OnInit {

  @Input()
  sortSourceOnDrag = false;

  @Output()
  dragEnded: EventEmitter<{indexSource: number, indexTarget: number}> = new EventEmitter();

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.el.nativeElement.draggable = true;
  }

  @HostListener('dragenter', ['$event'])
  onDragEnter(event) {
    target = event.currentTarget;
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event) {
    source = event.currentTarget;
    event.dataTransfer.effectAllowed = 'move';
  }

  @HostListener('dragend')
  onDragEnd() {
    if (this.sortSourceOnDrag) {
      target.parentNode.insertBefore(source,
          this.isElementBefore(source, target) ? target : target.nextSibling);
    }
    this.dragEnded.emit({
      indexSource: this.getElementIndex(source),
      indexTarget: this.getElementIndex(target)
    });
  }

  private getElementIndex(node: Element) {
    let index = 0;
    while ((node = node.previousElementSibling)) {
      index++;
    }
    return index;
  }

  private isElementBefore(first: Node, second: Node) {
    if (first.parentNode === second.parentNode) {
      for (let cur = first; cur; cur = cur.previousSibling) {
        if (cur === second) {
          return true;
        }
      }
    }
    return false;
  }
}
