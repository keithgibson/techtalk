---
title: Neural Networks and Transformers
# theme: solarized
revealOptions:
  transition: 'slide'
---

<!-- #### Neural Networks
 *and*
#### Transformers -->
#### Neural Networks and Transformers

*An introduction*

Note:
Welcome to this tech talk on neural networks and transformers.

Today, I'm hoping to provide a baseline understanding of these concepts. As such, I'll be erring on the side of simplification.

We'll start with neural network broadly followed by the key characteristics of the transformer, the fundamental neural network architecture of today's most advanced language models, including the GPT series and the chatbot ChatGPT.

---

So...what is a Neural Network?

Note:
So, what is a neural network?

Well, let's start by being more precise and instead ask, what is an *artificial* neural network?

I think more precision is helpful because an 'artificial' neural network inspired by another neural network. That is, the biological one, in the brain.

Which we have some familiarity with.

But, let's start with an overview.

A biological neural network is an interconnected system of - you guessed it - neurons.

But in a vacuum -

---
<!-- .slide: data-background-iframe="http://localhost:5000/" -->

Note:
on its own, what what meaning does one lone neuron have? What can it accomplish?
Well, none, nothing.

/ click

It is only in *relation* to other neurons,

only when *connected* to other neurons,

that it can take on meaning, that it can accomplish something.

This connection between neurons is called a synapse.

It takes the form of a chemical or electrical signal that, when fired, then causes another neuron to fire. And another, and another. Until you get a network that might vaguely be resembled by something like, this:

/click

---

So...that's the biological neural network.
What about the artificial neural network?

Note:
So...that's the biological neural network.
What about the artificial neural network?

---

Okay. What's a Transformer?

---
## Font Awesome

*  Itym One<!-- .element: class="mdfa fa-info-circle"--> (this is a feature test in a very long item)
*  Itym Two<!-- .element: class="mdfa fa-question-circle"-->
*  Itym Three<!-- .element: class="mdfa fa-exclamation-circle"-->
*  Itym 4<!-- .element: class="mdfa fa-exclamation-triangle"-->
with forced line break!

--

## Fragments

---

## Dont reveal all at once!

- Item 1 <!-- .element: class="fragment" data-fragment-index="2" -->
- Item 2 <!-- .element: class="fragment" data-fragment-index="1" -->
- Item 3 <!-- .element: class="fragment" data-fragment-index="3" -->

---

## GPT-2
```py [1|1,3|1,4|1,5|1,6|1,7|1,3-7]
# The model's own (hyper)parameters
    return HParams(
        n_vocab=0,
        n_ctx=1024,
        n_embd=768,
        n_head=12,
        n_layer=12,
    )
```

<div style="position: fixed; width: 100%; font-size: 0.4em">
  <a href="https://github.com/openai/gpt-2/blob/master/src/model.py">GPT-2 on Github</a>
</div>

Note:
  n_vocab=0
    this is the number of unique words in the dataset
    and determines the size of the input embeddings
    the number of tokens in the input sequence

  n_ctx=1024
    the maximum number of tokens in the context window
    determines the number of positions in the positional encoding

  n_embd=768
    the number of elements per embedding

  n_head=12
    the number of attention heads in each layer
    this is the number of times the model will split the input sequence
    and calculate attention weights

  n_layer=12
    the number of transformer layers
    this is the number of times the model will apply the transformer
    to the input sequence


---


## Being subtle

* Point a
<span style="color: red; font-size: 0.5em"> (but that is not important)</span>
* Point b

---

## Images

![](https://assets.amuniversal.com/0e1eaf909fcf012f2fe600163e41dd5b)

--
