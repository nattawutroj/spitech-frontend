import React from "react";
import "./Css/News_topic.css"
import ImgTopic from "../Images/ITLOGOhBG.jpg"

const Topic = ({ Title, Article }) => {
    return (
        <div className="CardTopic">
            <div className="TopicTitle">
                <article>{Title}</article>
            </div>
            <div className="article">
                <article>{Article}</article>
            </div>
            <div className="NewsTopicImg">
                <img src={ImgTopic} alt="ImgTopic" />
            </div>
        </div>
    );
}

const NewsTopic = () => {
    const topics = [
        { title: "ไฟล์รูปเล่มปริญญานิพนธ์", article: "Download Click" },
        { title: "ประกาศนักศึกษาที่ทำโครงงานให้หน่วยงานภายนอก", article: "ประกาศนักศึกษาที่ทำโครงงานให้หน่วยงานภายนอก จะต้องมีที่ปรึกษาร่วมเข้าสอบ 100% ทุกกลุ่ม" },
    ];

    return (
        <div className="NewTopicContainer">
            {topics.map((topic, index) => (
                <Topic
                    key={index}
                    Title={topic.title}
                    Article={topic.article}
                />
            ))}
        </div>
    );
};

export default NewsTopic;
