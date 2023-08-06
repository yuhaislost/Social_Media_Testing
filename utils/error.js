class ThesisError extends Error{
    constructor(t_ErrorMessage, t_StatusCode)
    {
        super(t_ErrorMessage);

        this.m_StatusCode = t_StatusCode;

        Error.captureStackTrace(this, this.constructur);
    }

    status() { return this.m_StatusCode; };
    message() { return this.message; };
    // classifyError(error)

};

export default ThesisError;