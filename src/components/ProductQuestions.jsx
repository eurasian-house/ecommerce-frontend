import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { getMyProfile } from "../services/reviewService";
import UserAvatar from "../components/common/UserAvatar";
import { getAvatar } from "../utils/getAvatar";
import {
    createQuestion,
    getProductQuestions,
} from "../services/questionService";

export default function ProductQuestions({ productId }) {
    const { user } = useAuth();

    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showAskBox, setShowAskBox] = useState(false);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        fetchQuestions();
    }, [productId]);

    async function fetchQuestions() {
        try {
            const data = await getProductQuestions(productId);
            setQuestions(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit() {
        if (!user) {
            toast.error("Please login to ask a question.");
            return;
        }

        if (!question.trim()) {
            toast.error("Please enter your question.");
            return;
        }

        try {
            setSaving(true);

            const profile = await getMyProfile(user.id);

            await createQuestion({
                product_id: productId,
                user_id: user.id,
                customer_name: profile.full_name,
                customer_avatar: profile.avatar_url,
                question: question.trim(),
            });

            setQuestion("");
            setShowAskBox(false);
            toast.success("Question submitted.");
            fetchQuestions();
        } catch (err) {
            console.error(err);
            toast.error(err.message);
        } finally {
            setSaving(false);
        }
    }

    if (loading) return null;

    return (
        <div className="card border-0 shadow-sm rounded-4 p-4 mt-5 bg-white">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h4 className="fw-bold mb-1">
                        Questions & Answers
                        <span className="badge bg-light text-dark ms-2 fw-normal">
                            {questions.length}
                        </span>
                    </h4>

                    <p className="text-muted mb-0">
                        Have a question? Our team usually replies within 1–5 hours.
                    </p>
                </div>

            </div>

            <div className="mb-4">

                {!showAskBox ? (

                    <button
                        className="btn btn-dark rounded-pill px-4 py-2"
                        onClick={() => setShowAskBox(true)}
                    >
                        <i className="bi bi-chat-left-dots me-2"></i>
                        Ask a Question
                    </button>

                ) : (

                    <>
                        <textarea
                            className="form-control rounded-3"
                            rows={3}
                            maxLength={300}
                            placeholder="What would you like to know about this product?"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />

                        <div className="d-flex justify-content-between mt-2">

                            <small className="text-muted">
                                <small className="text-muted">
                                    {300 - question.length} characters remaining
                                </small>
                            </small>

                            <div>

                                <button
                                    className="btn btn-light rounded-pill me-2"
                                    onClick={() => {
                                        setShowAskBox(false);
                                        setQuestion("");
                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="btn btn-dark rounded-pill px-4"
                                    disabled={saving}
                                    onClick={handleSubmit}
                                >
                                    {saving ? "Submitting..." : "Submit"}
                                </button>

                            </div>

                        </div>
                    </>

                )}

            </div>

            <hr />

            {questions.length === 0 ? (

                <div className="text-center py-5">

                    <i
                        className="bi bi-chat-square-text"
                        style={{ fontSize: "2.5rem", opacity: .3 }}
                    ></i>

                    <h6 className="mt-3 fw-semibold">
                        No questions yet
                    </h6>

                    <p className="text-muted mb-0">
                        Be the first to ask about this product.
                    </p>

                </div>

            ) : (
                <>

                    {(showAll ? questions : questions.slice(0, 3)).map((q) => (

                        <div
                            key={q.id}
                            className="border rounded-4 p-4 mb-3 bg-white shadow-sm"
                        >

                            <div className="d-flex align-items-start">

                                <UserAvatar
                                    src={getAvatar({
                                        avatar_url: q.customer_avatar
                                    })}
                                    alt={q.customer_name}
                                    size={42}
                                    className="me-3"
                                />

                                <div>

                                    <div className="fw-semibold">
                                        {q.question}
                                    </div>

                                    <div className="small text-muted mt-1">
                                        {q.customer_name || "Customer"}
                                    </div>

                                </div>

                            </div>

                            {q.is_answered ? (

                                <div
                                    className="mt-3 ms-5 p-3 rounded-3 bg-light border-start border-4"
                                    style={{ borderColor: "#198754" }}
                                >

                                    <div className="text-success fw-semibold mb-1">

                                        <i className="bi bi-patch-check-fill me-1"></i>

                                        Answered by Eurasian House

                                    </div>

                                    <div className="mt-2">

                                        {q.answer}

                                    </div>

                                </div>

                            ) : (

                                <div className="ms-3 text-muted fst-italic">

                                    Awaiting response from Eurasian House.

                                </div>

                            )}

                        </div>

                    ))}
                    {questions.length > 3 && (

                        <div className="text-center mt-3">

                            <button
                                className="btn btn-sm btn-outline-secondary rounded-pill px-4"
                                onClick={() => setShowAll(!showAll)}
                            >
                                {showAll
                                    ? "Show Less"
                                    : `View All Questions (${questions.length})`}
                            </button>

                        </div>

                    )}
                </>


            )}

        </div>
    );
}