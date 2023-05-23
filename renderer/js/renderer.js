const form = document.getElementById("interview_form");
if (form) {
  form.onsubmit = async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    let topic = formData.get("topic");

    if (topic.length <= 2) {
      alertMessage("error", "Please input at least 8 characters!");
      return;
    }

    const response = await window.axios.openAI(formData.get("topic"));
    document.getElementById("int_ques").innerHTML = JSON.stringify(response.choices[0].text).replace(/\\n/g, '');
  };
}

function alertMessage(status, topic){
  window.Toastify.showToast({
    text: topic,
    duration: 5000,
    stopOnFocus: true,
    style: {
      textAlign: "center",
      background: status == "error" ? "red":"green",
      color: "white",
      padding: "5px",
      marginTop: "2px"
    }
  });
}