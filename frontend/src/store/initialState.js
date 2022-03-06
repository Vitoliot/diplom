const initialState = {
  user: {
    id: null
  },
  user_for_profile: {
    id: 1,
    username: "vitoliot",
    firstname: null,
    lastname: null,
    email: "",
    icon: null,
    task_in_day: 5,
  },
  user_params: {
    BOFI: {
      is_loading: false,
      data: [],
    },
    Memory: {
      is_loading: false,
      data: [],
    },
    AA: {
      is_loading: false,
      data: [],
    },
    QER: {
      is_loading: false,
      data: [],
    },
  },
  user_courses: [],
  course_choicePage: {
    is_fetched: false,
    is_loading: false,
    courses: [],
    usercourses: [],
  },
  course_sort: {
    date: false,
    alphabet: false,
    rule: false,
    is_changed: false,
  },
  task_choicePage: {
    is_fecthed: false,
    is_loading: false,
    is_changed: false,
    is_theme: true,
    current_task_by_theme_and_id: [null, null],
    tasks: [],
  },
  current_course: {
    course: {
      id: 1,
      title: "100 стр в час",
      overview: "Единственный, и, следовательно, лучший",
      date_create: "07-01-2022",
      date_update: null,
      created_by: "admin",
      modules: [
        {
          id: 1,
          number: 1,
          title: "Модуль № 1",
          overview: "Научит читать с закрытыми глазами",
          date_create: "07-01-2022",
          date_update: null,
          created_by: "admin",
          tasks: [
            {
              id: 1,
              title: "Пучить глаза",
              overview: "Повторяйте",
              date_create: "07-01-2022",
              date_update: null,
              created_by: "admin",
              type: "ненормальный",
              theme: "сумасшедшая",
              is_completed: false,
              tries: [
                {
                  task: 1,
                  date: "07-01-2022",
                  time: 40,
                  correctness: 60,
                  answers: [
                    {
                      number: 1,
                      answer: "Да",
                      is_correct: true,
                      date: "07-01-2022",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      is_completed: false,
    },
    is_fetched: false,
    is_loading: false,
  },
  current_task: {
    is_fetched: false,
    is_loading: false,
    data: {
      id: 1,
      title: "Пучить глаза",
      overview: "Повторяйте",
      date_create: "07-01-2022",
      date_update: null,
      created_by: "admin",
      type: "ненормальный",
      theme: "сумасшедшая",
      is_completed: false,
      items: [
        {
          id: 1,
          title: "Что-то на инопланетном",
          overview: "Описание",
          date_create: "07-01-2022",
          date_update: null,
          created_by: "admin",
          content: "ЛОРЕМ ИПСУМ дальше забыл как",
          icon: "котик.png",
          questions: [
            {
              id: 1,
              number: 1,
              item: 1,
              question: "Зубы сегодня чистил?",
              answer: "Да",
              posible_answer_1: "Нет",
              posible_answer_2: null,
              posible_answer_3: null,
            },
          ],
        },
      ],
    },
  },
  errors: {
    content: [{ text: 's', type: "error", created: Date.now() }],
  },
  successes: {
    content: [],
  },
  cookie: localStorage.getItem("knowAboutCookie") || false,
};

export default initialState;
