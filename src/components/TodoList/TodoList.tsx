import React, { useContext } from 'react';
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';
import { TodoItem } from '../TodoItem';
import { StatusEnum } from '../../types/StatusEnum';
import { Todo } from '../../types/Todo';
import { FilterTodosContext } from '../../context/TodosContexts';

type Props = {
  todos: Todo[];
  tempTodo: Todo | null;
  onDeleteTodo: (todoId: number) => void;
  onChangeTitle: (todoId: number, newTitle: string) => void;
  onChangeCompletedStatus: (todoId: number, isCompleted: boolean) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onChangeCompletedStatus,
  onChangeTitle,
  onDeleteTodo,
  tempTodo,
}) => {
  const { filter } = useContext(FilterTodosContext);

  return (
    <section data-cy="TodoList" className="todoapp__main">
      <TransitionGroup>
        {todos.filter(todo => {
          switch (filter) {
            case StatusEnum.Active:
              return !todo.completed;
            case StatusEnum.Completed:
              return todo.completed;
            case StatusEnum.All:
            default:
              return todo;
          }
        }).map(todo => (
          <CSSTransition
            key={todo.id}
            timeout={300}
            classNames="item"
          >
            <TodoItem
              todo={todo}
              onDeleteTodo={onDeleteTodo}
              onChangeTitle={onChangeTitle}
              onChangeCompletedStatus={onChangeCompletedStatus}
            />
          </CSSTransition>
        ))}
        {tempTodo && (
          <CSSTransition
            key={0}
            timeout={300}
            classNames="item"
          >
            <TodoItem
              todo={tempTodo}
              onDeleteTodo={onDeleteTodo}
              onChangeTitle={onChangeTitle}
              onChangeCompletedStatus={onChangeCompletedStatus}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
    </section>
  );
};
