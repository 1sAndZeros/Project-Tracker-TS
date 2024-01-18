import Component from './base-component';
import * as Validation from '../utils/validation';
import { Projects } from '../state/project';
import autobind from '../decorators/autobind';

export default class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');

    this.titleInputElement = this.element.querySelector(
      '#title',
    )! as HTMLInputElement;
    this.descInputElement = this.element.querySelector(
      '#description',
    )! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people',
    )! as HTMLInputElement;

    this.configure();
  }

  // @autobind - make this work
  configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent(): void {}

  private gatherUserInput(): [string, string, number] | void {
    const title = this.titleInputElement.value;
    const desc = this.descInputElement.value;
    const people = this.peopleInputElement.valueAsNumber;

    const titleValidatable: Validation.Validateable = {
      value: title,
      required: true,
    };
    const descValidatable: Validation.Validateable = {
      value: desc,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validation.Validateable = {
      value: people,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !Validation.validate(titleValidatable) ||
      !Validation.validate(descValidatable) ||
      !Validation.validate(peopleValidatable)
    ) {
      alert('Invalid input, please try again!');
      return;
    } else {
      return [title, desc, people];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  @autobind
  private submitHandler(e: Event): void {
    e.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      Projects.addProject(title, desc, people);
      this.clearInputs();
    }
    return;
  }
}
