# This one goes with [storybook](https://storybook.js.org/docs/react/get-started/install)

## Please read the instruction

### `npm install`
### `npx sb init` if first time start
### `npm run storybook`

make sure you run it under Administrator rights

### [enjoy storybook inputSearch page](http://localhost:6006/?path=/docs/example-inputsearch--start-search)



##Task

<details>
  <summary>Task here, click to expand</summary>

Приложение, в котором реализован компонент (поле ввода) с автодополнением, который получает данные из какого-либо асинхронного источника. Чем более гибким будет апи компонента - тем лучше.

Компонент должен делать запрос к источнику после того, как введено минимальное количество символов в поле ввода (указанное в свойстве компонента).

Источник выдает список элементов на основе текста запроса к нему, принцип формирования списка любой, но рекомендуется какой-либо фильтр по подстроке.

Тип элементов в списке:

{ id: string; caption: string | ReactNode; }


Поле caption по смыслу должно соответствовать тексту запроса (например, начинаться с текста запроса, или содержать его как подстроку).
При выборе элемента из списка должно происходить событие "onSelectItem(id)"
Список из источника желательно отсортировать по алфавиту (в самом источнике, компонент о его логике не знает), и показать во всплывающем "тултипе/меню" под полем ввода.
Источник для примера может заполняться произвольными данными по таймауту, а может запрашивать данные с какого-нибудь публичного апи - это не важно. Главное, чтоб он был асинхронным.
Источник должен быть защищён от "гонок" - когда запрос меняется, а результат предыдущего запроса (не успевший прийти до изменения) приходит в качестве ответа. Всегда должен приходить результат последнего запроса.
Также нужно показывать индикатор загрузки - тут не нужно сложной верстки, главное, чтобы понятно пользователю было - вот сценарий:

начал вводить текст - ввел две буквы
ничего не показалось
ввел третью - показался список с индикатором загрузки
ввел четвертую - произошел перезапрос (старый игнорируется), индикатор на месте остался
подождал - пришли данные в список
ввел еще букву - данные пропали, появился индикатор загрузки (или данные остались, но затеняются индикатором загрузки)
выбрал элемент в списке - он закрылся

Какая-либо сложная верстка для поля ввода и списка не обязательна, достаточно стандартных инпутов и селектов. Но можно использовать и какую-нибудь css-библиотеку, если хочется.

Всплывающий тултип желательно реализовать отдельным компонентом, который будет привязан к элементу, под которым он всплывает, и при этом не использовать библиотек типа popper, а сделать его на чистом реакте и js/css,
режима же позиционирования достаточно одного (слева-внизу, например), но желательно подумать о добавлении разных вариантов позиционирования и настраиваемых модификаторов позиционирования, которые можно было бы добавлять при желании (например, подгонка тултипа под ширину блока, под которым он выпадает).

Реализовывать разные режимы позиционирования не надо, достаточно одного, нужна именно идея об удобном добавлении новых режимов.

При реализации тултипа нужно учитывать, что он может лежать в разных родителях, по-разному спозиционированных, с разным значением overflow и z-index, а также в подобных тултипу компонентах: тултип должен всегда перекрывать все родительские элементы (и даже такой же родительский тултип,  из которого он может быть показан (например, как подменю)).

Реализовывать примеры тултипа, показанного из тултипа (или ещё из какого-то подобного родителя) не надо, нужна именно сама реализация тултипа с безопасным перекрытием родителей.
</details>
//-------------
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
