import ModalBase from "../../components/modals/ModalBase";
import ModalForm from "../../components/modals/ModalForm";
import ModalHeader from "../../components/modals/ModalHeader";
import FormInput from "../../components/FormInput";
import FormSubmit from "../../components/FormSubmit";
import { connect } from "react-redux";
import { setCreateGoal } from "../../actions/modalActions";
import { useState } from "react";
import { createGoal } from "../../actions/goalActions";
import { clearGoalErrors } from "../../actions/errorActions";
import isEmpty from "is-empty";

const CreateGoalModal = ({ active, userId, setCreateGoal, createGoal, clearGoalErrors, errors }) => {
    const [title, setTitle] = useState("");
    
    const onSubmit = () => {
        createGoal(userId, title, onClose);
    };

    const onClose = () => {
        setCreateGoal(false);
        setTitle("");
        clearGoalErrors();
    };

    if (active) {
        return (
            <ModalBase>
                <ModalHeader
                    closeModal={onClose}
                >
                    Create new goal
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
                        onClick={onSubmit}
                        label="Create" 
                    />
                </ModalForm>
            </ModalBase>
        );
    }
    return null;
};

const mapStateToProps = state => ({
    userId: state.auth.user.id,
    active: state.modal.isCreateGoal,
    errors: state.errors.goal
});

export default connect(mapStateToProps, { setCreateGoal, createGoal, clearGoalErrors })(CreateGoalModal);