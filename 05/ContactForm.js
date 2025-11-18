import React, { useReducer } from 'react';

const initialState = {
    values: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    },
    errors: {},
};

function reducer(state, action) {
    switch (action.type) {
        case 'CHANGE_FIELD':
            return {
                ...state,
                values: { ...state.values, [action.field]: action.value },
            };
        case 'SET_ERRORS':
            return { ...state, errors: action.errors };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}

export default function ContactForm() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const validate = () => {
        const errors = {};
        const { name, email, subject, message } = state.values;

        if (!name.trim()) errors.name = 'Imię i nazwisko jest wymagane.';
        if (!email.trim()) errors.email = 'Adres e-mail jest wymagany.';
        else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Podaj poprawny adres e-mail.';
        if (!subject.trim()) errors.subject = 'Temat jest wymagany.';
        if (!message.trim()) errors.message = 'Wiadomość jest wymagana.';

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate();

        if (Object.keys(errors).length > 0) {
            dispatch({ type: 'SET_ERRORS', errors });
            return;
        }

        // eslint-disable-next-line no-undef
        alert('Formularz został wysłany!');
        dispatch({ type: 'RESET' });
    };

    const handleChange = (e) => {
        dispatch({
            type: 'CHANGE_FIELD',
            field: e.target.name,
            value: e.target.value,
        });
    };

    const { values, errors } = state;

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div>
                <input
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Imię i nazwisko"
                />
                {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
            </div>

            <div>
                <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            </div>

            <div>
                <input
                    type="tel"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    placeholder="Numer telefonu"
                />
            </div>

            <div>
                <input
                    type="text"
                    name="subject"
                    value={values.subject}
                    onChange={handleChange}
                    placeholder="Temat"
                />
                {errors.subject && <p style={{ color: 'red' }}>{errors.subject}</p>}
            </div>

            <div>
                <textarea
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    placeholder="Wiadomość"
                />
                {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}
            </div>

            <button type="submit">Wyślij</button>
        </form>
    );
}
