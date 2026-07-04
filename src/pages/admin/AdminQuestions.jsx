import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { answerQuestion, getAllQuestions, } from "../../services/questionService";

export default function AdminQuestions() {

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [answer, setAnswer] = useState({});
    const [filter, setFilter] = useState("pending");

    useEffect(() => {
        fetchQuestions();
    }, []);

    async function fetchQuestions() {
        try {
            const data = await getAllQuestions();
            setQuestions(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleAnswer(id) {
        try {
            await answerQuestion(id, answer[id]);

            toast.success("Answer saved.");

            fetchQuestions();

        } catch (err) {
            console.error(err);
            toast.error(err.message);
        }
    }

    if (loading) {
        return (
            <div className="container py-4">
                Loading...
            </div>
        );
    }

    return (
        <div className="container py-4">

            <h2 className="fw-bold mb-4">
                Product Questions
            </h2>

            <div className="mb-4">

                <button
                    className={`btn me-2 ${filter === "pending"
                        ? "btn-dark"
                        : "btn-outline-dark"
                        }`}
                    onClick={() => setFilter("pending")}
                >
                    Pending
                </button>

                <button
                    className={`btn ${filter === "answered"
                        ? "btn-dark"
                        : "btn-outline-dark"
                        }`}
                    onClick={() => setFilter("answered")}
                >
                    Answered
                </button>

            </div>

            {questions
                .filter((q) =>
                    filter === "pending"
                        ? !q.is_answered
                        : q.is_answered
                )
                .map((q) => (

                    <div
                        key={q.id}
                        className="card shadow-sm border-0 rounded-4 p-4 mb-4"
                    >
                        <div className="d-flex align-items-center mb-3">

                            <img
                                src={q.products?.thumbnail}
                                alt={q.products?.title}
                                className="rounded-3 me-3"
                                style={{
                                    width: 60,
                                    height: 60,
                                    objectFit: "cover"
                                }}
                            />

                            <div>

                                <div className="fw-semibold">
                                    {q.products?.title}
                                </div>

                                <div className="small text-muted">
                                    {q.customer_name || "Customer"}
                                </div>

                            </div>

                        </div>

                        <div className="fw-bold mb-2">

                            {q.customer_name || "Customer"}

                        </div>

                        <div className="mb-3">

                            <strong>Question:</strong>

                            <br />

                            {q.question}

                        </div>

                        {q.is_answered ? (

                            <div>

                                <div className="text-success fw-semibold mb-2">
                                    Answer
                                </div>

                                {q.answer}

                            </div>

                        ) : (

                            <>
                                <textarea
                                    className="form-control rounded-3"
                                    rows={4}
                                    placeholder="Write answer..."
                                    value={answer[q.id] || ""}
                                    onChange={(e) =>
                                        setAnswer({
                                            ...answer,
                                            [q.id]: e.target.value,
                                        })
                                    }
                                />

                                <div className="text-end mt-3">

                                    <button
                                        className="btn btn-dark rounded-pill px-4"
                                        onClick={() => handleAnswer(q.id)}
                                    >
                                        Publish Answer
                                    </button>

                                </div>

                            </>

                        )}

                    </div>

                ))}

        </div>
    );
}