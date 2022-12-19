import { deleteGoal, updateGoal } from "../../actions/goalActions";
import { setUpdateGoal } from "../../actions/modalActions";
import { useState, useEffect } from "react";
import ModalBase from "../../components/modals/ModalBase";
import ModalHeader from "../../components/modals/ModalHeader";
import ModalForm from "../../components/modals/ModalForm";
import FormInput from "../../components/FormInput";
import FormSubmit from "../../components/FormSubmit";
import { connect } from "react-redux";
import { initialUpdateGoal } from "../../reducers/modalReducer";
import { clearGoalErrors } from "../../actions/errorActions";

const UpdateGoalModal = ({ data, setUpdateGoal, updateGoal, userId, deleteGoal, errors, clearGoalErrors }) => {
    const [title, setTitle] = useState(data.title);

    const onSave = () => {
        updateGoal(userId, data.index, title, onClose);
    };

    const onClose = () => {
        clearGoalErrors();
        setUpdateGoal(initialUpdateGoal);
    };

    const onDelete = () => {
        deleteGoal(userId, data.index);
        onClose();
    };

    useEffect(() => {
        setTitle(data.title);
    }, [data.title]);

    if (data.active) {
        return (
            <ModalBase>
                <ModalHeader
                    closeModal={onClose}
                >
                    Update goal
                </ModalHeader>
                <ModalForm>
                    <FormInput 
                        value={title}
                        setValue={setTitle}
                        label="Goal" 
                        placeholder="Your goal here"
                        error={errors.title} 
                    />
                    <FormSubmit 
                        onClick={onSave}
                        label="Save" 
                    />
                    <FormSubmit 
                        onClick={onDelete}
                        label="Delete" 
                        danger
                    />
                </ModalForm>
            </ModalBase>
        );
    }
    return null;
};

const mapStateToProps = state => ({
    userId: state.auth.user.id,
    data: state.modal.updateGoal,
    errors: state.errors.goal
});

export default connect(mapStateToProps, { updateGoal, setUpdateGoal, deleteGoal, clearGoalErrors })(UpdateGoalModal);