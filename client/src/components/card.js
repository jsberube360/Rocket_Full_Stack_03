import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CustomCards({title, text, src, button, variant, action, top, left}) {
  return (
    <Card style={{ width: '35rem', position: 'relative', top: top, left: left}}>
      <Card.Img variant="top" src={src} />
      <Card.Body style={{ textAlign: "center"}}>
        <Card.Title style={{color: "rgb(170, 69, 69)"}}>{title}</Card.Title>
        <Card.Text style={{ textAlign: "justify"}}>
          {text}
        </Card.Text>
        <Button variant={variant} onClick={action}>{button}</Button>
      </Card.Body>
    </Card>
  );
}

export default CustomCards;