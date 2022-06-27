import styles from './Container.module.css';

function Container(props) {
    // console.log(props.children)
    return (
        <div className={` ${styles.container} ${styles[props.customClass]}`}>
            { props.children }
        </div>

    )
}

export default Container;