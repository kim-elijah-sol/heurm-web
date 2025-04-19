# Layers

| 레이어   | 사용 가능한 레이어                               | 사용될 수 있는 레이어                         |
| -------- | ------------------------------------------------ | --------------------------------------------- |
| app      | `pages`,`widgets`,`features`,`entities`,`shared` | -                                             |
| pages    | `widgets`,`features`,`entities`,`shared`         | `app`                                         |
| widgets  | `features`,`entities`,`shared`                   | `app`,`pages`                                 |
| features | `entities`,`shared`                              | `app`,`pages`,`widgets`                       |
| entities | `shared`                                         | `app`,`pages`,`widgets`,`features`            |
| shared   | -                                                | `app`,`pages`,`widgets`,`features`,`entities` |

# Slices

DDD 에서 얘기하는 (도메인) 역할을 한다.<br>
widgets, features, entities 에서 주로 사용할 것 같다.

# Segments

기능을 분리하기 위한 영역이다.<br>
`ui`, `api`, `model`, `lib` 등 역할을 분리할 수 있다.<br>
